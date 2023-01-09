// Import Library
// import * as argon2 from 'argon2';
// import jwt from 'jsonwebtoken';

// Import Model
import {
  findGroupByMemberId,
  findGroupById,
  createGroup,
  updateGroupInfo,
  addMember,
  updateMemberRole,
  removeMember,
  deleteGroup,
} from "./groupModel";
import {
  findUserById,
  findUserByIds,
  findUserByEmail,
} from "../user/userModel";

// Import Service
import { sendInvitationMail } from "../../services/email/index";
import {
  createInvitation,
  isInvitationValid,
  getInvitationDetail,
  getInvitationPublic,
} from "../invitation/invitationModel";

/**
 * Get All Group
 * @param req
 * @param res
 * @returns void
 */
export const getAllByUserId = async (req, res) => {
  try {
    findGroupByMemberId(req.id, {
      success: (groups) => {
        const data = groups.filter(({ members }) => {
          const user = members?.find((member) => member.detail.equals(req.id));
          return user.status;
        });
        res.json({ success: true, data });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get One Group
 * @param req
 * @param res
 * @returns void
 */
export const getOne = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;

  try {
    findGroupById(id, userId, {
      success: (group) => {
        if (!group) {
          return res
            .status(404)
            .json({ success: false, message: "Group not exist" });
        }
        const userIds = group.members.map((member) => member.detail);
        findUserByIds(userIds, {
          success: (users) => {
            const data = {
              name: group.name,
              members: group.members,
              users: users.map((user) => {
                return { detail: user._id, name: user.name, email: user.email };
              }),
            };
            return res.status(200).json({ success: true, data });
          },
          error: (error) => {
            console.log(error);
            return res
              .status(500)
              .json({ success: false, message: "Internal server error" });
          },
        });
      },
      error: (error) => {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * POST Create Group
 * @param req
 * @param res
 * @returns void
 */
export const postCreate = async (req, res) => {
  const { name } = req.body;
  const userId = req.id;

  try {
    createGroup(
      {
        name,
        members: [
          {
            detail: userId,
            role: "owner",
            status: true,
          },
        ],
      },
      {
        success: (group) => {
          createInvitation(
            { isPublic: true, group: group._id },
            {
              success: (invitation) => {
                const clientDomain = req.get("origin")
                  ? req.get("origin") + "/"
                  : req.get("referer");
                const genLink =
                  clientDomain +
                  `groups/invite?group=${group._id}&code=${invitation.key}`;
                res
                  .status(200)
                  .json({ success: true, data: { group, inviteUrl: genLink } });
              },
              error: (error) => {
                console.log(error);
                res
                  .status(500)
                  .json({ success: false, message: "Internal server error" });
              },
            }
          );
        },
        error: (error) => {
          console.log(error);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        },
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * POST Invite Member
 * @param req
 * @param res
 * @returns void
 */
export const postInvite = async (req, res) => {
  const { groupId, emails } = req.body;
  const userId = req.id;

  try {
    let success = true;
    findUserById(userId, {
      success: (owner) => {
        emails.forEach((email) => {
          createInvitation(
            {
              isPublic: false,
              group: groupId,
              sendTo: email,
            },
            {
              success: async (invitation) => {
                const clientDomain = req.get("origin")
                  ? req.get("origin") + "/"
                  : req.get("referer");
                const genLink =
                  clientDomain +
                  `groups/invite?group=${groupId}&code=${invitation.key}`;
                try {
                  await sendInvitationMail(
                    owner.name,
                    "Group",
                    [email],
                    genLink
                  );
                  findUserByEmail(email, {
                    success: (user) =>
                      addMember(groupId, {
                        detail: user._id,
                        role: "member",
                        status: false,
                      }),
                  });
                } catch (error) {
                  console.log({ error });
                }
              },
              error: (error) => {
                console.log(error);
                success = false;
                return res
                  .status(500)
                  .json({ success: false, message: "Internal server error" });
              },
            }
          );
        });
      },
      error: (error) => {
        console.log(error);
        success = false;
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
    if (success) {
      res.status(200).json({ success: true, message: "Invited successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * PUT Update Group
 * @param req
 * @param res
 * @returns void
 */
export const putUpdate = async (req, res) => {
  const { id } = req.params;
  const { groupInfo } = req.body;
  try {
    updateGroupInfo(groupInfo, {
      success: (group) => {
        res.status(200).json({ success: true, data: group });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * DELETE Detele Group
 * @param req
 * @param res
 * @returns void
 */
export const deleteRemove = async (req, res) => {
  const { id } = req.params;
  try {
    deleteGroup(id, {
      success: () => {
        res.status(200).json({ success: true, message: "Deleted Successful" });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const postJoinGroup = async (req, res) => {
  const { id: groupId } = req.params;
  const { userEmail, inviteKey: key } = req.body;
  const userId = req.id;

  try {
    const { isValid } = await isInvitationValid({ key, userEmail });

    if (!isValid) {
      return res
        .status(200)
        .json({ success: false, message: "Invite link is invalid" });
    }

    // addMember(
    //   groupId,
    //   { detail: userId, role: "member" },
    //   {
    //     success: (group) => {
    //       res.status(200).json({ success: true, data: group });
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       res
    //         .status(500)
    //         .json({ success: false, message: "Internal server error" });
    //     },
    //   }
    // );

    updateMemberStatus(
      groupId,
      { detail: userId, status: true },
      {
        success: (group) => {
          res.status(200).json({ success: true, data: group });
        },
        error: (error) => {
          console.log(error);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        },
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getInviteUrl = async (req, res) => {
  const { id: groupId } = req.params;

  getInvitationPublic(groupId, {
    success: (invitation) => {
      const clientDomain = req.get("origin")
        ? req.get("origin") + "/"
        : req.get("referer");
      const genLink =
        clientDomain + `groups/invite?group=${groupId}&code=${invitation.key}`;
      res.status(200).json({ success: true, data: { inviteUrl: genLink } });
    },
    error: (error) => {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    },
  });
};

export const deleteRemoveMember = async (req, res) => {
  const { id: groupId, userId } = req.params;
  // const { userId } = req.body;

  console.log(groupId, userId);
  removeMember(groupId, userId, {
    success: (group) => {
      res.status(200).json({ success: true, data: group });
    },
    error: (error) => {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    },
  });
};

export const putUpdateMember = async (req, res) => {
  const { id: groupId, userId } = req.params;
  const { role } = req.body;

  updateMemberRole(
    groupId,
    { detail: userId, role },
    {
      success: (group) => {
        res.status(200).json({ success: true, data: group });
      },
      error: (error) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      },
    }
  );
};

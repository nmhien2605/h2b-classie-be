import {
  findPresentationById,
  findPresentationGroupById,
  findPresentationByCode,
  findPresentationByUserId,
  findPresentationByGroupId,
  createPresentation,
  updatePresentationInfo,
  deletePresentation,
  updatePresentationIsPresent,
} from "./presentationModel";
import { updateGroupIsPresent } from "../group/groupModel";
import { generateCodeNumber } from "../../services/code";
import { FIRST_SLIDE } from "../../constants";

/**
 * Get All Presentation
 * @param req
 * @param res
 * @returns void
 */
export const getAllByUserId = async (req, res) => {
  try {
    findPresentationByUserId(req.id, {
      success: (presentations) =>
        res.json({ success: true, data: presentations }),
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
 * Get One Presentation
 * @param req
 * @param res
 * @returns void
 */
export const getOneById = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;

  try {
    if (!id || id === null) {
      return res
        .status(404)
        .json({ success: false, message: "ID presentation not exist" });
    } else {
      console.log(id);
      findPresentationById(id, {
        success: (presentation) => {
          if (!presentation) {
            return res
              .status(404)
              .json({ success: false, message: "Presentation not exist" });
          } else {
            return res.status(200).json({ success: true, data: presentation });
          }
        },
        error: (error) => {
          console.log(error);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get One Presentation
 * @param req
 * @param res
 * @returns void
 */
export const getOneByCode = async (req, res) => {
  const { code } = req.params;
  const userId = req.id;

  try {
    findPresentationByCode(code, {
      success: (presentation) => {
        if (!presentation) {
          return res
            .status(404)
            .json({ success: false, message: "Presentation not exist" });
        } else {
          if (presentation.isPresent) {
            return res.status(200).json({ success: true, data: presentation });
          } else {
            return res
              .status(200)
              .json({ success: false, message: "Presentation is not present" });
          }
        }
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
 * Get Presentations By GroupId
 * @param req
 * @param res
 * @returns void
 */
export const getAllByGroupId = async (req, res) => {
  const { group } = req.params;
  const userId = req.id;

  try {
    console.log(group);
    findPresentationByGroupId(group, {
      success: (presentations) => {
        return res.status(200).json({ success: true, data: presentations });
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
 * POST Create Presentation
 * @param req
 * @param res
 * @returns void
 */
export const postCreate = async (req, res) => {
  const { name } = req.body;
  const userId = req.id;

  try {
    createPresentation(
      {
        ...FIRST_SLIDE,
        name,
        code: generateCodeNumber(8),
        owner: userId,
        groups: [],
      },
      {
        success: (presentation) => {
          res.status(200).json({ success: true, data: presentation });
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
 * PUT Update Presentation
 * @param req
 * @param res
 * @returns void
 */
export const putUpdate = async (req, res) => {
  const { id } = req.params;
  const presentationInfo = req.body;
  try {
    updatePresentationInfo(id, presentationInfo, {
      success: (presentation) => {
        res.status(200).json({ success: true, data: presentation });
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
 * DELETE Detele Presentation
 * @param req
 * @param res
 * @returns void
 */
export const deleteRemove = async (req, res) => {
  const { id } = req.params;
  try {
    deletePresentation(id, {
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

/**
 * GET Check Presentation can present
 * @param req
 * @param res
 * @returns void
 */
export const checkEnablePresent = async (req, res) => {
  const { id } = req.params;

  try {
    findPresentationGroupById(id, {
      success: (presentation) => {
        if (presentation.isPresent) {
          return res.status(200).json({ success: true, message: "Enable true" });
        }
        if (!presentation.isPublic && presentation.groups[0].isPresent) {
          return res
            .status(200)
            .json({ success: false, message: "Enable false" });
        }
        return res.status(200).json({ success: true, message: "Enable true" });
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
 * PUT Update Presentation
 * @param req
 * @param res
 * @returns void
 */
export const putEnablePresent = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;

  try {
    findPresentationGroupById(id, {
      success: (presentation) => {
        if (presentation.isPresent) {
          return res.status(200).json({ success: true, data: presentation });
        }
        if (!presentation.isPublic && presentation.groups[0].isPresent) {
          return res
            .status(200)
            .json({ success: false, message: "Enable false" });
        }
        updatePresentationIsPresent(id, userId, true, {
          success: (data) => {
            if (data.groups[0]) {
              updateGroupIsPresent(data.groups[0]._id, true, {
                success: (group) => {},
                error: (error) => {
                  console.log(error);
                  return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
                },
              });
            }
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
 * PUT Update Presentation
 * @param req
 * @param res
 * @returns void
 */
export const putDisablePresent = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;

  try {
    findPresentationGroupById(id, {
      success: (presentation) => {
        updatePresentationIsPresent(id, userId, false, {
          success: (data) => {
            if (data.groups[0]) {
              updateGroupIsPresent(data.groups[0]._id, false, {
                success: (group) => {},
                error: (error) => {
                  console.log(error);
                  return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
                },
              });
            }
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
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

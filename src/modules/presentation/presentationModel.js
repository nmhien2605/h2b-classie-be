import mongoose from "mongoose";
import { findUserByEmail, User } from "../user/userModel";
import { Group } from "../group/groupModel";
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: Schema.Types.String, require: true },
    slides: [
      {
        detail: {
          title: { type: Schema.Types.String, require: true },
          type: { type: Schema.Types.String, require: true },
          options: [{ type: Schema.Types.String, require: true }],
          values: [{ type: Schema.Types.Number, require: true }],
        },
        _id: false,
      },
    ],
    code: { type: Schema.Types.String, require: true },
    owner: { type: Schema.Types.ObjectId, ref: User, require: true },
    "co-owner": [{ type: Schema.Types.ObjectId, ref: User, require: false }],
    groups: [{ type: Schema.Types.ObjectId, ref: Group }],
    isPublic: { type: Schema.Types.Boolean, default: 1 },
    isPresent: { type: Schema.Types.Boolean, default: 0 },
  },
  { timestamps: true }
);

export const Presentation = mongoose.model("Presentation", schema);

/**
 * @param {ObjectId} presentationId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns find presentation info
 */
export const findPresentationById = async (presentationId, callbacks) => {
  try {
    const presentation = await Presentation.findOne({
      _id: presentationId,
    }).populate("co-owner");
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {ObjectId} presentationId
 * @param {ObjectId} userId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns find presentation info
 */
export const findPresentationGroupById = async (presentationId, userId, callbacks) => {
  try {
    const presentation = await Presentation.findOne({
      _id: presentationId, $or: [{ owner: userId }, { "co-owner": { $elemMatch: { $eq: userId }}}]
    }).populate("groups");
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {code} code
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns find presentation info
 */
export const findPresentationByCode = async (code, callbacks) => {
  try {
    const presentation = await Presentation.findOne({
      code: code,
    });
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {code} code
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns find presentation info
 */
export const findPresentationGroupByCode = async (code, callbacks) => {
  try {
    const presentation = await Presentation.findOne({
      code: code,
    }).populate("groups");
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {ObjectId} userId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns find presentation info
 */
export const findPresentationByUserId = async (userId, callbacks) => {
  try {
    const presentations = await Presentation.find({
      $or: [{ owner: userId }, { "co-owner": { $eq: userId } }],
    }).populate("owner");
    callbacks?.success(presentations);
    return presentations;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {ObjectId} groupId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns find presentation info
 */
export const findPresentationByGroupId = async (groupId, callbacks) => {
  try {
    const presentations = await Presentation.find({
      groups: { $elemMatch: { $eq: groupId } },
    });
    callbacks?.success(presentations);
    return presentations;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {*} presentationInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns new presentation info
 */
export const createPresentation = async (presentationInfo, callbacks) => {
  try {
    const presentation = await Presentation.create(presentationInfo);
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {ObjectId} presentationId
 * @param {*} presentationInfo
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated presentation info
 */
export const updatePresentationInfo = async (
  presentationId,
  presentationInfo,
  callbacks
) => {
  try {
    const presentation = await Presentation.findOneAndUpdate(
      { _id: presentationId },
      presentationInfo,
      { new: true }
    );
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {ObjectId} presentationId
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated presentation info
 */
export const deletePresentation = async (presentationId, callbacks) => {
  try {
    await Presentation.findOne({ _id: presentationId }).remove();
    callbacks?.success();
    return true;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

/**
 * @param {ObjectId} presentationId
 * @param {ObjectId} userId
 * @param {boolean} isPresent
 * @param {{success: (data) => void, error: (e) => void}} callbacks
 * @returns updated presentation info
 */
export const updatePresentationIsPresent = async (
  presentationId,
  userId,
  isPresent,
  callbacks
) => {
  try {
    const presentation = await Presentation.findOneAndUpdate(
      { _id: presentationId, $or: [{ owner: userId }, { "co-owner": { $eq: userId } }] },
      { isPresent: isPresent },
      { new: true }
    );
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

export const addCoOwner = async (presentationId, email, callbacks) => {
  try {
    const user = await findUserByEmail(email);

    if (user === null) {
      callbacks.error();
    }

    const presentation = await Presentation.findOneAndUpdate(
      { _id: presentationId },
      { $push: { "co-owner": user._id } },
      { new: true }
    );
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};

export const removeCoOwner = async (presentationId, userId, callbacks) => {
  try {
    const presentation = await Presentation.findOneAndUpdate(
      { _id: presentationId },
      { $pull: { "co-owner": userId } },
      { new: true }
    );
    callbacks?.success(presentation);
    return presentation;
  } catch (error) {
    callbacks?.error(error);
    throw error;
  }
};
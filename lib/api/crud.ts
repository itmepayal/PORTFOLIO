import mongoose, { type Model } from "mongoose";
import { connectDB } from "@/lib/db";
import { jsonError, jsonFromError, jsonSuccess } from "@/lib/api/http";

type EntityCrudConfig = {
  entityName: string;
  entityKey: string;
  invalidIdMessage?: string;
  updateMessage?: string;
  deleteMessage?: string;
};

type UpdateContext<T> = {
  id: string;
  body: Record<string, unknown>;
  existing: T | null;
};

export function createEntityCrudHandlers<T extends mongoose.Document>(
  model: Model<T>,
  config: EntityCrudConfig,
) {
  const invalidIdMessage =
    config.invalidIdMessage ?? `Invalid ${config.entityName} ID`;
  const notFoundMessage = `${config.entityName} not found`;
  const updateMessage =
    config.updateMessage ?? `${config.entityName} updated successfully`;
  const deleteMessage =
    config.deleteMessage ?? `${config.entityName} deleted successfully`;

  async function getById(id: string) {
    try {
      await connectDB();

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return jsonError(invalidIdMessage, 400);
      }

      const doc = await model.findById(id);
      if (!doc) return jsonError(notFoundMessage, 404);

      return jsonSuccess({ [config.entityKey]: doc });
    } catch (error) {
      return jsonFromError(error);
    }
  }

  async function updateById(
    id: string,
    body: Record<string, unknown>,
    transform?: (ctx: UpdateContext<T>) => Promise<Record<string, unknown> | null>,
  ) {
    try {
      await connectDB();

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return jsonError(invalidIdMessage, 400);
      }

      const existing = await model.findById(id);
      if (!existing) return jsonError(notFoundMessage, 404);

      const payload = transform
        ? await transform({ id, body, existing })
        : body;

      if (!payload) return jsonError(notFoundMessage, 404);

      const updated = await model.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });

      if (!updated) return jsonError(notFoundMessage, 404);

      return jsonSuccess({
        message: updateMessage,
        [config.entityKey]: updated,
      });
    } catch (error) {
      return jsonFromError(error);
    }
  }

  async function deleteById(id: string) {
    try {
      await connectDB();

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return jsonError(invalidIdMessage, 400);
      }

      const deleted = await model.findByIdAndDelete(id);
      if (!deleted) return jsonError(notFoundMessage, 404);

      return jsonSuccess({ message: deleteMessage });
    } catch (error) {
      return jsonFromError(error);
    }
  }

  return { getById, updateById, deleteById };
}

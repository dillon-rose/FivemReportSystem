import { callbacks } from "@client/modules/callbacks";
import { nuiManager } from "@client/modules/nui";
import { TRating } from "@common/types";

nuiManager.registerNuiCallback<{ reportNumber: number | null, staffId: string, rating: TRating, note: string }>("addNote", async (data, cb) => {
    const success = await callbacks.triggerServerCallback("addNote", data.reportNumber, data.staffId, data.rating, data.note);

    cb(success);
});
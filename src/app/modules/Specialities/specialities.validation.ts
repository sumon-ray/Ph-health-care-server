import { z } from "zod";

const create = z.object({
    title: z.string({required_error: "title is required"})
})


export const specialities = {
    create
}
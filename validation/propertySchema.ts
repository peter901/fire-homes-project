import {z} from "zod"

export const propertyDataSchema = z.object({
    address1: z.string().min(1, "Address line 1 must contain atleast one charater"),
    address2: z.string().optional(),
    city : z.string().min(3,"City must contain atleast 3 characters"),
    postcode: z.string().refine((postcode) => {
        const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
        return postcodeRegex.test(postcode)
    }, "Invalid UK postcode"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    description: z.string().min(40, "Description must contain atleast 40 characters"),
    bedrooms: z.coerce.number().min(0,"Bedrooms must be atleast 0"),
    bathrooms: z.coerce.number().min(0,"Bathrooms must be atleast 0"), 
    status: z.enum(["draft","for-sale","withdrawn","sold"])  
})
 
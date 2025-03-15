import z from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(
    (value) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return regex.test(value);
    },
    {
      message:
        "Password must contain atleast 6 characters, an uppercase letter, lower case letter, a number and a special character",
    }
  ),
});

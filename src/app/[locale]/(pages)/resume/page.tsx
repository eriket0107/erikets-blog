import { redirect } from "next/navigation"

const Resume = () => {
  return redirect(process.env.NEXT_PUBLIC_RESUME_URL || "")
}

export default Resume

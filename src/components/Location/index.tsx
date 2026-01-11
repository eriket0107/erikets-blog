import { MapPin } from "lucide-react"
import { Typography } from "../Typography"
import { getTranslations } from "next-intl/server"

export const Location = async () => {
  const t = await getTranslations("LocationComponent")
  return (
    <div className="relative flex gap-2 items-center px-0 py-3  w-fit" >
      <MapPin className="text-accent-foreground" size={16} />
      <Typography.P className="text-lg text-accent-foreground! mt-0!">Rio de Janeiro, {t("brazil")}</Typography.P>
    </div>
  )
}
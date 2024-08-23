import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { widget } = service;
  const { t } = useTranslation();

  const { data: response, error: responseError } = useWidgetAPI(widget, "statistics");

  if (responseError) {
    return (
      <Container service={service}>
        <Block label="Error" value={responseError.message} />
      </Container>
    );
  }

  if (responseError) {
    return <Container service={service} error={responseError} />;
  }

  if (response) {
  const platforms = response.PLATFORMS;
  const totalRoms = response.ROMS;
  const totalSaves = response.SAVES;
  const totalStates = response.STATES;
  const totalScreenshots = response.SCREENSHOTS;
  const totalFilesizeGB = (response.FILESIZE / (1024 ** 3)).toFixed(2);

  return (
    <Container service={service}>
      <Block label="romm.platforms" value={t("common.number", { value: platforms })} />
      <Block label="romm.totalRoms" value={t("common.number", { value: totalRoms })} />
      <Block label="romm.totalSaves" value={t("common.number", { value: totalSaves })} />
      <Block label="romm.totalStates" value={t("common.number", { value: totalStates })} />
      <Block label="romm.totalScreenshots" value={t("common.number", { value: totalScreenshots })} />
      <Block label="romm.totalFilesize" value={t("common.filesize", { value: totalFilesizeGB })} />
    </Container>
  );
 }
}

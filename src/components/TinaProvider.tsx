
import { TinaEditProvider } from "tinacms/dist/edit-state";

export const TinaProvider = ({ children }: { children: React.ReactNode }) => {
  return <TinaEditProvider showEditButton={true}>{children}</TinaEditProvider>;
};

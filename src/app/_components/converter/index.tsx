import { ConverterProvider } from "./converter-context";
import { ConverterOptions } from "./converter-options";
import { ConverterDropzone } from "./converter-dropzone";
import { ConverterQueue, ConverterItem } from "./converter-queue";

export function ConverterRoot({ children }: { children: React.ReactNode }) {
  return <ConverterProvider>{children}</ConverterProvider>;
}

export const Converter = {
  Root: ConverterRoot,
  Options: ConverterOptions,
  Dropzone: ConverterDropzone,
  Queue: ConverterQueue,
  Item: ConverterItem,
  Provider: ConverterProvider,
};

export { useConverterContext } from "./converter-context";

export type { FileItem } from "./converter-context";

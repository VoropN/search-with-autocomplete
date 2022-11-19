import { memo } from "react";

interface IHighlightedText {
  text: string;
  valueToHighlight: string;
}

export const HighlightedText = memo(
  ({ text, valueToHighlight }: IHighlightedText) => {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text.replace(
            new RegExp(valueToHighlight, "i"),
            (val: string) => `<b>${val}</b>`
          ),
        }}
      />
    );
  }
);

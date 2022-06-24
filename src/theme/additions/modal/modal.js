export const ModalComponent = {
  components: {
    Modal: {
        variants: {
            wide: {
                content: {
                    p: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    position: "relative",
                    borderRadius: "20px",
                    minWidth: "0px",
                    wordWrap: "break-word",
                    bg: "navy.800",
                    backgroundClip: "border-box",
                }
            }
        }
    }
  },
};

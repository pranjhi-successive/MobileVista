export const getFormStyle = (screens, token) => {
    const container = {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
      backgroundColor: token.colorBgContainer,
    };
  
    const footer = {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    };
  
    const header = {
      marginBottom: token.marginXL,
      textAlign: "center",
    };
  
    const section = {
      alignItems: "center",
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
      backgroundColor: "#f0f0f0",
      backgroundSize: "cover",
    };
  
    const text = {
      color: token.colorTextSecondary,
    };
  
    const title = {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    };
  
    return { container, footer, header, section, text, title };
  };
  
// @mui material components
import Divider from "@mui/material/Divider";

// Soft UI Dashboard React components
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import brand from "../../../../assets/images/logo-ct.png";

function Separator() {
  return (
    <SoftBox position="relative" py={0.25}>
      <Divider />
      <SoftBox
        bgColor="white"
        position="absolute"
        top="50%"
        left="50%"
        px={1.5}
        lineHeight={1}
        sx={{ transform: "translate(-50%, -60%)" }}
      >
        <SoftTypography variant="button" fontWeight="medium" color="secondary">
        <img src={brand}  style={{height:40}}/>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

export default Separator;

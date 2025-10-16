import ViewIcon from "../assets/images/icons/View.svg";
import EmailIcon from "../assets/images/icons/email.svg";
export const BASE_URL = "https://directory.bmibook.com/api/api/v1/";
export const COMPANY_URL = "https://directory.bmibook.com/company/view/";

// export const SERVER_URL = "https://coupon.masking.sptest.dev/api/deals/";
// export const PROXY_URL = "https://coupon.masking.sptest.dev/proxy/";
// export const MRTHOD1_URL = "https://coupon.masking.sptest.dev/proxy-method1/";
export const PROXY_URL = "http://localhost:4000/";
export const MRTHOD1_URL = "http://localhost:4200/";
export const SERVER_URL = "http://localhost:5000/deals";

export const UserIcons = [
  {
    key: "view",
    path: ViewIcon,
    label: "View",
    route: "",
  },
];

export const FamilyTreeIcons = [
  {
    key: "view",
    path: ViewIcon,
    label: "View",
    route: "",
  },
  {
    key: "email",
    path: EmailIcon,
    label: "Send Email",
    route: "",
  },
];
export const CompanyFamilyTreeIcons = [
  {
    key: "view",
    path: ViewIcon,
    label: "View",
    route: "",
  },
];

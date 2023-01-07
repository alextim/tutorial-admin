import { Button, Icons } from "@pankod/refine-antd";
import { API_URL } from "../../../constants";

export const GoogleButton = () => (
  <Button
    type="default"
    block
    icon={<Icons.GoogleOutlined />}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: '8px',
    }}
    onClick={(e) => {
      e.preventDefault();
      window.location.assign(`${API_URL}/auth/login/google`);
    }}
  >
    Google
  </Button>
);

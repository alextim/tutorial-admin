import {
  Layout as DefaultLayout,
} from '@pankod/refine-antd';
import { Header } from '../header';
import { Sider } from '../sider';

export const Layout = () => (
  <DefaultLayout Sider={Sider} Header={Header}  />
);


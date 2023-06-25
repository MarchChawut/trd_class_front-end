import Head from "next/head";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../state/store";
import FirstPage from "./first";

const Index = () => (
  <>
    <Head>
      <title>{process.env.RESOURCE_NAME}</title>
    </Head>
    <Provider store={store}>
      <HomepageContent />
    </Provider>
  </>
);

const HomepageContent = () => {
  return (
    <div>
      <FirstPage></FirstPage>
    </div>
  );
};

export default Index;

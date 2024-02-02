import React, {
  createContext,
  lazy,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Content, Layout, Sider } from "../../../components";
const Sidebar = lazy(() => import("./Filter"));

const Items = lazy(() => import("./Items"));
export const ListingContext = createContext();

const Listing = () => {
  const [filters, setFilters] = useState({});
  const [toFetch, setToFetch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const contextValue = useMemo(() => {
    return {
      filters,
      setFilters,
      toFetch,
      setToFetch,
      setCurrentPage,
      currentPage,
      itemsPerPage,
      setItemsPerPage,
    };
  }, [
    filters,
    setFilters,
    toFetch,
    setToFetch,
    setCurrentPage,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
  ]);
  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <Layout>
      <ListingContext.Provider value={contextValue}>
        <Sider width={300} style={{ background: "#fff" }}>
          <Sidebar />
        </Sider>
        <Content style={{ padding: "0 30px 50px 15px", minHeight: 280 }}>
          <Items />
        </Content>
      </ListingContext.Provider>
    </Layout>
  );
};

export default Listing;

import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import { Tab, Tabs } from "@nextui-org/react";
import Event from "../event/Event";
import Club from "../club/Club";
import Feed from "../feed/Feed";
import { useNavigate, useParams } from "react-router-dom";

const Community = () => {
  const { selectPage } = useParams();
  const navigate = useNavigate();

  const tabs = [
    { id: "event", label: "이벤트" },
    { id: "club", label: "클럽" },
    { id: "feed", label: "피드" },
  ];

  const [selected, setSelected] = useState("event");

  useEffect(() => {
    const tabExists = tabs.some((tab) => tab.id === selectPage);
    if (tabExists) {
      setSelected(selectPage);
    } else {
      navigate("/community", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPage, navigate]);

  const handleTabChange = (value) => {
    setSelected(value);
    navigate(`/community/${value}`, { replace: true });
  };

  const renderComponent = () => {
    switch (selected) {
      case "event":
        return <Event />;
      case "club":
        return <Club />;
      case "feed":
        return <Feed />;
      default:
        return navigate("/");
    }
  };

  return (
    <Layout>
      <Tabs
        variant="underlined"
        aria-label="Options"
        fullWidth
        size="lg"
        className="mb-5"
        selectedKey={selected}
        items={tabs}
        onSelectionChange={handleTabChange}
      >
        {(item) => (
          <Tab
            key={item.id}
            title={item.label}
            value={item.id}
            style={styles.title}
          />
        )}
      </Tabs>
      {renderComponent()}
    </Layout>
  );
};

export default Community;

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 900,
  },
};

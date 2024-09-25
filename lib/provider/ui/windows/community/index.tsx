import type { ReactNode } from "react";

import type { Language } from "./types";

import { User, User2, User3, Wab321019 } from "@react95/icons";
import { useState } from "react";
import { Button, createScrollbars, GroupBox, Radio, Separator } from "react95";
import styled from "styled-components";

import { Window } from "~/lib/window";

import communityImage from "./community.webp";
import cssModule from "./index.module.css";
import { Payment } from "./payment";
import { content } from "./types";

const StyledWindow = styled(Window)`
  display: flex;
  flex-direction: column;
`;

const ScrollView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  ${createScrollbars()}
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const ImageContainer = styled.div`
  width: 30%;
  position: relative;
  padding-bottom: 50%;
`;

const CommunityImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid black;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.h2`
  font-weight: bold;
  text-align: left;
  font-size: 24px;
`;

const Description = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const BulletPoint = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const BulletIcon = styled.span`
  margin-right: 10px;
`;

const BulletContent = styled.span`
  flex: 1;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Footer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  padding-right: 20px;
`;

const StyledDivider = styled(Separator)`
  margin: 20px;
`;

const HozizontalDivider = styled(Separator)`
  margin: 20px 0;
  flex-grow: 0;
  flex-shrink: 0;
`;

export function Community(): ReactNode {
  const [language, setLanguage] = useState<Language>("en");
  const [error, setError] = useState<string>("");
  const [currentView, setCurrentView] = useState<"main" | "payment">("main");
  const data = content[language];

  const handleToggleView = (): void => {
    setCurrentView(currentView === "main" ? "payment" : "main");
  };

  const handleLanguageChange = (value: Language): void => {
    setLanguage(value);
  };

  const renderDescription = (description: string): ReactNode =>
    description.replace(
      "{{author}}",
      language === "vi" ? "Trần Minh Phúc" : "Minh-Phuc Tran",
    );

  const renderBulletPoint = (icon: ReactNode, content: string): ReactNode => (
    <BulletPoint>
      <BulletIcon>{icon}</BulletIcon>
      <BulletContent>{renderDescription(content)}</BulletContent>
    </BulletPoint>
  );

  return (
    <StyledWindow
      className={cssModule.window}
      window="Community"
      defaultWidth={1200}
      defaultHeight={750}
    >
      <ScrollView>
        <ContentWrapper className={cssModule.contentWrapper}>
          <ImageContainer className={cssModule.imageContainer}>
            <CommunityImage src={communityImage.src} alt="Community" />
          </ImageContainer>
          <ContentContainer className={cssModule.contentContainer}>
            {currentView === "main" ? (
              <>
                <Title>{data.title}</Title>
                <Description>{renderDescription(data.description)}</Description>
                {renderBulletPoint(<Wab321019 />, data.communityDetails)}
                {renderBulletPoint(<User />, data.ownerIntroduction)}
                {renderBulletPoint(<User3 />, data.knowledgeSharing)}
                {renderBulletPoint(<User2 />, data.note)}
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </>
            ) : (
              <Payment
                language={language}
                data={data}
                setError={setError}
                error={error}
              />
            )}
          </ContentContainer>
        </ContentWrapper>
        <HozizontalDivider />
        <Footer>
          <Button onClick={handleToggleView}>
            {currentView === "main" ? data.joinButton : data.backButton}
          </Button>
          <StyledDivider orientation="vertical" />
          <GroupBox
            style={{
              margin: "0px",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Radio
              style={{
                margin: "0px",
                padding: "0px",
                marginRight: "10px",
                fontSize: "12px",
              }}
              checked={language === "en"}
              onChange={() => {
                handleLanguageChange("en");
              }}
              value="en"
              label="EN"
            />
            <Radio
              style={{ margin: "0px", padding: "0px", fontSize: "12px" }}
              checked={language === "vi"}
              onChange={() => {
                handleLanguageChange("vi");
              }}
              value="vi"
              label="VI"
            />
          </GroupBox>
        </Footer>
      </ScrollView>
    </StyledWindow>
  );
}

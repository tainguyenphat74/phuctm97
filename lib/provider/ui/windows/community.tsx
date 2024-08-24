import type { ReactNode } from "react";

import { useState } from "react";
import { Anchor, Button } from "react95";
import styled from "styled-components";

import { buyLicense } from "~/lib/buy-license";
import { Window } from "~/lib/window";

const StyledWindow = styled(Window)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export function Community(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  function handleJoinNow(): void {
    setIsLoading(true);
    buyLicense()
      .catch((error: unknown) => {
        setError("An error occurred. Please try again.");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <StyledWindow window="P Community" defaultWidth={400} defaultHeight={350}>
      <Title>Join P Community</Title>
      <Description>
        Connect with other Vietnamese developers, share your challenges, get
        help from{" "}
        <Anchor
          css="display: inline-block;"
          href="https://x.com/phuctm97"
          target="_blank"
          rel="noopener noreferrer"
        >
          Minh-Phuc Tran
        </Anchor>
        , and others in the community.
      </Description>
      <Description>
        Please note that our community primarily communicates in Vietnamese. We
        recommend joining only if you speak Vietnamese.
      </Description>
      <Button
        css="flex-shrink: 0;"
        onClick={handleJoinNow}
        disabled={isLoading}
      >
        {isLoading ? "Loading…" : "Join Now"}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </StyledWindow>
  );
}

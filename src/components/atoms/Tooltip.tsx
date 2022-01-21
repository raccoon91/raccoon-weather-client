import styled from "styled-components";

export const Tooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.4rem 1rem;
  border: 1px solid darkgray;
  border-radius: 0.3rem;
  background-color: white;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.3s linear, top 0.3s linear, left 0.3s linear;

  .tooltip-wrapper {
    display: flex;
    margin: 0.3rem 0;

    .tooltip-label {
      width: 3.6rem;
    }

    .tooltip-value {
      word-break: keep-all;
      white-space: nowrap;
    }
  }
`;

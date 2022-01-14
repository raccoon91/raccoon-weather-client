import { MemoryRouter } from "react-router-dom";
import { Box } from "components/atoms";
import { MobileNavigation } from "components/molecules";
import { Meta } from "stories/storybook";

export default {
  title: "Molecules/Mobile Navigation",
  component: MobileNavigation,
  decorators: [
    (StoryBook) => (
      <MemoryRouter initialEntries={["/today"]}>
        <StoryBook />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof MobileNavigation>;

const Template = () => (
  <Box w="100%" h="7rem" m="4rem 0 0">
    <MobileNavigation />
  </Box>
);

export const Default = Template.bind({});

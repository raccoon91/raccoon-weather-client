import { MemoryRouter } from "react-router-dom";
import { Navigation } from "components/molecules";
import { Meta } from "stories/storybook";

export default {
  title: "Molecules/Navigation",
  component: Navigation,
  decorators: [
    (StoryBook) => (
      <MemoryRouter initialEntries={["/today"]}>
        <StoryBook />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof Navigation>;

const Template = () => <Navigation />;

export const Default = Template.bind({});

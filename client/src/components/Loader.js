import { StyledLoader } from "../styles";

const Loader = () => {
  return (
    <>
      <StyledLoader>
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </StyledLoader>
    </>
  );
};

export default Loader;

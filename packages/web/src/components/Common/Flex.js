import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// gap =>'none' | 'small' | 'medium' | 'large' | 'xlarge' | 'huge';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  flex-wrap: ${props => (props.nowrap ? 'no-wrap' : 'wrap')};
  & > *:not(:last-child) {
    ${({ gap, direction }) =>
      gap
        ? direction === 'column'
          ? css`
              margin-bottom: ${p => p.theme.space[gap]}px;
            `
          : css`
              margin-right: ${p => p.theme.space[gap]}px;
            `
        : null}
  }
`;
Flex.propTypes = {
  direction: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  nowrap: PropTypes.bool,
  gap: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'xlarge', 'huge']),
};
export default Flex;

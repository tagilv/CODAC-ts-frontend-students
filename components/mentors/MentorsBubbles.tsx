import React from 'react'
import { styled } from '@mui/material/styles'
import Popover from '@mui/material/Popover';
import { MentorEntity, MentorEntityResponseCollection } from '../../graphql/global/ __generated__/types';



export const MentorsContent = styled('div')`
  position: relative;
  transition: all 0.3s;
  width: 100px;
  height: 100px;

  &:hover {
    transform: translateY(-1em);
  }

  @media only screen and (max-width: 600px) {
    width: 60px;
    height: 60px;
  }

  ${'img'} {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.palette.background.default};
    cursor: pointer;
  }
`

function MentorsBubbles({ mentors }:{ mentors: MentorEntityResponseCollection }) {

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [popoverContent, setPopoverContent] = React.useState<String>("");

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, name: String) => {
    setPopoverContent(name);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: 'flex' }}>
      { mentors.data.map((mentor:MentorEntity, i:Number) => {
        return mentor.attributes ?
          <MentorsContent key={mentor.attributes?.lastname}>
            <img style={{ marginLeft: `-${i}em` }} src={ mentor.attributes?.avatar?.data?.attributes?.url || "assets/logo.png" } 
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(e) => handlePopoverOpen(e, mentor.attributes?.firstname || "")}
              onMouseLeave={handlePopoverClose}/>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <p style={{ padding: "0.5em", margin: 0 }}>{ popoverContent }</p>
            </Popover>
          </MentorsContent>
        : null
          }) }
    </div>
  )
}

export default MentorsBubbles
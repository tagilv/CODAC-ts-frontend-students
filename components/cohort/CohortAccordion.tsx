import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ArrowDown } from 'mdi-material-ui';
import { styled } from '@mui/material/styles'
import { CohortEntity } from "../../graphql/global/ __generated__/types";

export const CohortContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 1em;

  ${'img'} {
    width: 50px;
    height: 50px;
  }
  ${'p'} {
    margin: 0;
  }
  ${'h4'} {
    margin: 0;
  }
`
export const StudentContent = styled('div')`
  display: grid;
  grid-template-columns: 65% 20% 10%;
  padding: 0.5em 0;
  align-items: center;
  border-top: solid 1px ${({ theme }) => theme.palette.divider};

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
    cursor: pointer;
  }

  ${'p'} {
    margin: 0;
  }
  ${'img'} {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 1em;
  }
  .align-right {
    text-align: right;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 100%;
    grid-row-gap: 0.3em;
    .align-right {
      text-align: initial;
    }
  }
`

function CohortAccordion({ cohort, i }:{ cohort: CohortEntity, i: Number }) {

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <Accordion key={ cohort.attributes?.name } expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
      <AccordionSummary
        expandIcon={ <ArrowDown /> }
        aria-controls={`panel${i}bh-content`}
        id={`panel${i}bh-header`}>
        <CohortContent>
          <img src={ cohort.attributes?.logo?.data?.attributes?.url || "assets/logo.png" } alt={ cohort.attributes?.name || "Cohort" } />
          <div>
            <h4>{ cohort.attributes?.name }</h4>
            <p>start date: { cohort.attributes?.start_date }</p>
          </div>
        </CohortContent>
      </AccordionSummary> 
      <AccordionDetails>
        { cohort.attributes?.students && cohort.attributes?.students.data.map((student) => {
          return <StudentContent key={ student.attributes?.lastname }>
            <div style={{ display: "flex" }}>
              <img src={ student.attributes?.avatar?.data?.attributes?.url || "assets/logo.png" } alt={ student.attributes?.firstname + " " + student.attributes?.lastname || "Student"}/>
              <p>{ student.attributes?.firstname }  { student.attributes?.lastname }</p>
            </div>
            <p>Graduation: { student.attributes?.end_date }</p>
            <p className='align-right'><b>{ student.attributes?.main_course?.data?.attributes?.name }</b></p>
          </StudentContent>
        }) }
      </AccordionDetails>
    </Accordion>
  )
}

export default CohortAccordion
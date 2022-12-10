import React from 'react'
import { BrandText } from '../components/common/BrandStyle'
import { GetCohortsDocument } from '../graphql/queries/__generated__/cohorts';
import { MentorsDocument } from '../graphql/queries/__generated__/mentors';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { initializeApollo } from "../lib/apolloClient";
import { CohortEntity, StudentEntity } from "../graphql/global/ __generated__/types";
import CohortAccordion from '../components/cohort/CohortAccordion';
import MentorsBubbles from '../components/mentors/MentorsBubbles';


function community({ error, cohorts, mentors }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const alumniCohorts = cohorts.filter((cohort:CohortEntity) => {
    return cohort.attributes?.students?.data.every((student:StudentEntity) => {
      return new Date(student.attributes?.end_date) < new Date();
    })
  })

  const activeCohorts = cohorts.filter((cohort:CohortEntity) => {
    return cohort.attributes?.students?.data.some((student:StudentEntity) => {
      return new Date(student.attributes?.end_date) >= new Date();
    })
  })

  return (
    <>
      {/* <BrandText variant='h3' sx={{ fontSize: 80 }}>Codacommunity</BrandText> */}
      <h1>CodaCommunity</h1>
      { error && <p>Something went wrong...</p> }
      
      { mentors && <>
        <h4>Your mentors for: </h4>
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          <span>
            <h5>Web Development</h5>
            <MentorsBubbles mentors={ mentors } />
          </span>
          <span>
            <h5>Data Science</h5>
            <MentorsBubbles mentors={ mentors } />
          </span>
          <span>
            <h5>Career Services</h5>
            <MentorsBubbles mentors={ mentors } />
          </span>
        </div>

      </> }

      { cohorts && <>
        <h4>Active Cohorts</h4>
        { activeCohorts.map((cohort:CohortEntity, i:Number) => {
          return cohort.attributes ? 
            <CohortAccordion key={ cohort.attributes.name } cohort={ cohort } i={ i } />
          : null
        }) }

        <h4>Alumni</h4>
        { alumniCohorts.map((cohort:CohortEntity, i:Number) => {
          return cohort.attributes ? 
            <CohortAccordion key={ cohort.attributes.name } cohort={ cohort } i={ i } />
          : null
        }) }
      </> }

    </>
  )
}

export default community

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const client = initializeApollo(null, ctx.req);
    const cohorts = await client.query({ query: GetCohortsDocument });
    const mentors = await client.query({ query: MentorsDocument })
    return {
      props: {
        cohorts: cohorts.data.cohorts.data,
        mentors: mentors.data.mentors
      }
    }
  } catch (err) {
    console.log("error: ", err);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
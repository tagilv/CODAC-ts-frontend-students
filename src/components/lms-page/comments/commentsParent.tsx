import { Box, Typography } from '@mui/material';
import { useGetLmsFeedbacksQuery } from 'cabServer/queries/__generated__/lmsFeedback';
import React, { MouseEvent, useEffect, useState } from 'react';
import lms from 'src/pages/lms/[[...page]]';

import CreateComment from './createComment';
import ShowComments from './showComments';

type LMSfeedbackProps = {
  slug: string;
};

const CommentsParent = ({ slug }: LMSfeedbackProps) => {
  const { data, loading, error, refetch } = useGetLmsFeedbacksQuery({
    variables: {
      slug: slug,
    },
  });
  const lmsFeedback = data?.lmsFeedbacks?.data[0];
  console.log('comments', lmsFeedback);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lmsFeedback]);

  return (
    <>
      {' '}
      <Box
        sx={{
          p: 5,
          // display: 'flex',
          width: '50%',
        }}
      >
        <Typography variant="h5">Comments</Typography>
      </Box>
      <Box
        sx={{
          p: 5,
          display: 'flex',
          width: '50%',
        }}
      >
        {lmsFeedback && <CreateComment slug={slug} refetch={refetch} />}
      </Box>
      {lmsFeedback?.attributes?.comments && (
        <ShowComments
          slug={slug}
          lmsComments={lmsFeedback?.attributes?.comments}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default CommentsParent;

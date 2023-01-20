import { CommentsDisabled } from '@mui/icons-material';
import { Avatar, Divider, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import {
  ComponentCommentsComments,
  LmsFeedbackEntity,
} from 'cabServer/global/__generated__/types';
import { useGetLmsFeedbacksQuery } from 'cabServer/queries/__generated__/lmsFeedback';
import React, { MouseEvent, useEffect, useState } from 'react';
import CreateComment from 'src/components/lms-page/comments/createComment';

type LMSfeedbackProps = {
  slug: string;
  lmsComments: ComponentCommentsComments;
  refetch: () => void;
  // lmsComment: LmsFeedbackEntity;
};

const ShowComments = ({ slug, lmsComments, refetch }: LMSfeedbackProps) => {
  // const { data, loading, error, refetch } = useGetLmsFeedbacksQuery({
  //   variables: {
  //     slug: slug,
  //   },
  // });
  // const lmsComments = data?.lmsFeedbacks?.data || [];
  // console.log('comments', lmsComments);

  // useEffect(() => {
  //   refetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lmsComments]);

  return lmsComments.map((lmsComment) => (
    <Box
      sx={{
        p: 5,
        // display: 'flex',
        width: '50%',
      }}
      key={lmsComment.}
    >
      <Paper style={{ padding: '40px 20px' }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
            // alt={username}
            // src={imgLink}
            />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>
              {lmsComment?.author?.data?.attributes?.username}
            </h4>
            <p style={{ textAlign: 'left' }}>{lmsComment?.message}</p>

            <p style={{ textAlign: 'left', color: 'gray' }}>
              {new Date(lmsComment?.timestamp).toDateString()}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  ));
};

export default ShowComments;

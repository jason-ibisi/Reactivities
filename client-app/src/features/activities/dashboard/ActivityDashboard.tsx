import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';

interface IProps {
  activities: IActivity[];
}

const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList activities={activities}/>
      </GridColumn>
      <GridColumn width={6}>
        <ActivityDetails />
      </GridColumn>
    </Grid>
  );
};

export default ActivityDashboard;

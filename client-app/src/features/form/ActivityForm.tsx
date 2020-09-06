import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity, IActivityFormValues } from '../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import SelectInput from '../../app/common/form/SelectInput';
import { category } from '../../app/common/options/categoryOptions';
import DateTimeInput from '../../app/common/form/DateTimeInput';
import { combineDateAndTime } from '../../app/common/util/util';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialFormState,
    createActivity,
    editActivity,
    loadActivity,
    clearActivity,
    submitting,
  } = activityStore;

  const [activity, setActivity] = useState<IActivityFormValues>({
    id: undefined,
    title: '',
    category: '',
    description: '',
    date: undefined,
    time: undefined,
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (match.params.id && activity.id) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id,
  ]);

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  rows={3}
                  name='description'
                  placeholder='Description'
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  name='category'
                  placeholder='Category'
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                />
                <Form.Group widths='equal'>
                  <Field
                    name='date'
                    placeholder='Date'
                    date={true}
                    value={activity.date}
                    component={DateTimeInput}
                  />
                  <Field
                    name='time'
                    placeholder='Time'
                    time={true}
                    value={activity.time}
                    component={DateTimeInput}
                  />
                </Form.Group>

                <Field
                  name='city'
                  placeholder='City'
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name='venue'
                  placeholder='Venue'
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  onClick={() => history.push('/activities')}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);

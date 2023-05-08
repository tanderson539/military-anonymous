import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

function MentalHealth() {
  const [surveyTable, setSurveyTable] = useState<JSX.Element | null>();
  const [surveyResults, setSurveyResults] = useState(0);

  let surveyQuestionsList = ['Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless', 'Trouble falling or staying asleep',
    'Feeling tired or having little energy', 'Poor appetite or overeating',
    'Feeling bad about yourself... or that you are a failure or have let yourself or your family down', 'Trouble concentrating on things, such as reading the newspaper or watching television',
    'Moving or speaking so slowly that other people could have noticed. Or the opposite... being so figety or restless that you have been movin g around a lot more than usual',
    'Thoughts that you would be better off dead, or of hurting yourself']

  useEffect(() => {

    surveyQuestionsList.map(question => {
      setSurveyTable(
        <>
          <li className="list-group-item">
            <h6>{question}</h6>
            <Form>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="0"
                    name="group1"
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="1"
                    name="group1"
                    onClick={() => setSurveyResults(surveyResults + 1)}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    inline
                    label="2"
                    name="group1"
                    onClick={() => setSurveyResults(surveyResults + 2)}
                    id={`inline-${type}-3`}
                  />
                  <Form.Check
                    inline
                    label="3"
                    name="group1"
                    onClick={() => setSurveyResults(surveyResults + 3)}
                    id={`inline-${type}-3`}
                  />
                </div>
              ))}
            </Form>
          </li>
        </>
      );
    })
  }, []);


  return (
    <div>
      <h1>Mental Health Survey</h1>

      <ul className="list-group list-group-flush">
        <div>hello hello can u see me</div>
        {surveyTable}
      </ul>
      <span>Your score is {surveyResults}</span>
    </div>
  )
}

export default MentalHealth;
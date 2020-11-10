import AccountSettingsLayout from 'components/common/layout/AccountSettingsLayout'
import Field from 'components/common/Field'

import styled from 'styled-components'
import { Button } from 'components/common/Button'

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
`

const BasicInformation = ({ permissions }) => {
  return (
    <AccountSettingsLayout permissions={permissions}>
      <div>
        <div>
          <p>Set your login preferences</p>
          <div>
            <div>
              <label>
                <div>
                  <Field
                    id={'1'}
                    name={'Test'}
                    type={'type'}
                    autoComplete={'true'}
                    required={true}
                    label={'Country/Region'}
                    placeholder={'Test'}
                  />
                </div>
              </label>
              <label>
                <div>
                  <Field
                    id={'1'}
                    name={'Menu Title'}
                    type={'type'}
                    autoComplete={'true'}
                    required={true}
                    label={'Country/Region'}
                    placeholder={'Ex. Drink Menu'}
                  />
                </div>
              </label>
              <label>
                <div>
                  <Field
                    id={'1'}
                    name={'Menu Title'}
                    type={'type'}
                    autoComplete={'true'}
                    required={true}
                    label={'Language'}
                    placeholder={'Ex. Drink Menu'}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div>
          <StyledButtonContainer>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </StyledButtonContainer>
        </div>
      </div>
    </AccountSettingsLayout>
  )
}

export default BasicInformation

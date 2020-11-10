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

const TeamSettings = ({ permissions }) => {
  return (
    <AccountSettingsLayout permissions={permissions}>
      <div>
        <div className="pt-6 pb-8 sm:pt-8">
          <p className="text-sm text-gray-700">Set your team preferences here.</p>
          <div className="mt-6">
            <div className="max-w-4xl mx-auto">
              <label className="block">
                <div className="mt-2">
                  <Field
                    id={'1'}
                    name={'Test'}
                    type={'type'}
                    autoComplete={'true'}
                    required={true}
                    label={'Team Name'}
                    placeholder={'Test'}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 px-0 py-5 flex justify-end">
          <StyledButtonContainer>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </StyledButtonContainer>
        </div>
      </div>
    </AccountSettingsLayout>
  )
}

export default TeamSettings

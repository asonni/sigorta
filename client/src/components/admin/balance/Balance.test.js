import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'semantic-ui-react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { ViewBalances } from './ViewBalances';
import { NewBalance } from './NewBalance';
import DeleteBalance from './DeleteBalance';
import BalanceForm from './BalanceForm';

describe('<ViewBalances />', () => {
  it('should have a <DeleteBalance />', () => {
    const wrapper = shallow(
      <ViewBalances
        balances={[
          {
            client: { name: 'Aladdin' },
            balance: 3000,
            transaction: 'add',
            createdAt: null
          }
        ]}
        fetchBalances={() => {}}
      />
    );
    expect(wrapper.find(DeleteBalance)).toHaveLength(1);
  });
});

describe('<NewBalance />', () => {
  it('should have a <BalanceForm /> at the first of render', () => {
    const wrapper = shallow(
      <NewBalance clients={[]} fetchClients={() => {}} />
    );
    expect(wrapper.find(BalanceForm)).toHaveLength(1);
  });
});

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Users } from '../layout/menu/Users';

export const MenuTab = () => {
    return <Tabs className='tabs'>
        <TabPanel className='tabs__panel'>
            <div><h1>Example</h1></div>
        </TabPanel >
        <TabPanel className='tabs__panel'>
            <Users />
        </TabPanel>
        <TabList className='tabs__list row'>
            <Tab type='button' className='col nav-link text-center' id='nav-example-tab' aria-selected='false'><i className='fas fa-hand-holding-usd'></i><small>Example</small></Tab>
            <Tab type='button' className='col nav-link text-center' id='nav-example-tab' aria-selected='false'><i className='fas fa-users'></i><small>Users</small></Tab>
        </TabList>
    </Tabs>
}
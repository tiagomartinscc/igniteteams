import { useState } from 'react'

import {Container} from './styles'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { FlatList } from 'react-native'

export function Groups() {
  const [groups, setGroups] = useState(['Galera do Rocket'])
  return (
    <Container>
      <Header />
      <Highlight 
        title='Turmas' 
        subtitle='Jogue com a sua turma' 
      />
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item} 
          />
        )}
      />
      
    </Container>
  );
}

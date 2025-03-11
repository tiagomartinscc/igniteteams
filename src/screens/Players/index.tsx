import { useState, useEffect, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import { Alert, FlatList, TextInput } from 'react-native'

import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO'
import { playerAddByGroup } from '@storage/players/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam'
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup'

import { AppError } from '@utils/AppError'

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"

import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { ButtonIcon } from "@components/ButtonIcon"
import { Input } from "@components/Input"
import { Filter } from "@components/Filter"
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const route = useRoute()
  const { group } = route.params as RouteParams
  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleNewPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }
    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
      await fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar a pessoa no time.');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Lista pessoas', error.message);
      } else {
        console.log(error)
        Alert.alert('Lista pessoas', `Não foi possível listar o time ${team}`);
      }      
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remover pessoa', error.message);
      } else {
        console.log(error)
        Alert.alert('Remover pessoa', `Não foi possível remover ${playerName} da lista`);
      }              
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome da pessoa" 
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleNewPlayer}
          returnKeyType='done'
        />

        <ButtonIcon 
          icon="add"
          onPress={handleNewPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={["Time A", "Time B"]}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
    </HeaderList>

    <FlatList 
      data={players}
      keyExtractor={item => item.name}
      ListEmptyComponent={() => (
        <ListEmpty 
          message="Não há pessoas neste time." 
        />
      )}
      renderItem={({ item }) => (
        <PlayerCard 
          onRemove={() => handlePlayerRemove(item.name)}
          name={item.name}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {paddingBottom: 100},
        players.length === 0 && {flex: 1}
      ]}
    />

    <Button 
      title='Remover Turma'
      type='SECONDARY'
    />
    </Container>
  )
}
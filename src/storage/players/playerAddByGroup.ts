import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppError } from "@utils/AppError"
import { PLAYERS_COLLECTION } from "@storage/storageConfig"
import { PlayerStorageDTO } from "./PlayerStorageDTO"
import { playersGetByGroup } from "./playersGetByGroup"

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO, 
  group: string) {
  try {
    const storedPlayers = await playersGetByGroup(group)
    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)
    if (playerAlreadyExists.length > 0) {
      throw new AppError(`Jogador ${newPlayer.name} já está cadastrado em um time`)
    }
    const storage = JSON.stringify([...storedPlayers, newPlayer])
    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
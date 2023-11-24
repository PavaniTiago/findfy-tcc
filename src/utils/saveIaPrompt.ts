import { useMyContext } from "@/app/context/context"
import { getDatabase, ref, set } from "firebase/database"

// const { minhaVariavel } = useMyContext()

export const saveIaSearchTodataBase = async (completion: string) => {
    const db = getDatabase()
      const userRef = ref(db, `users/AiSearch`)
      await set(userRef, completion)
}
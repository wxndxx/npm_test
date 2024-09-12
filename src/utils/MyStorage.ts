interface IMyStorage {
    set: (name: string, item: any) => void;
    get: (name: string) => any;
    delete: (name: string) => void;
  }
  
  /**
   * Класс используемый для взаимодействия с localStorage
   */
  export const MyStorage: IMyStorage = {
    /**
     * Добавление элемента в хранилище
     */
    set: (name, item) => {
        localStorage.setItem("matalex_" + name, JSON.stringify(item));
    },
    /**
     * Получение элемента из хранилища
     */
    get: (name) => {
      const item = localStorage?.getItem("matalex_" + name);
    
        if (item) {
          return JSON.parse(item);
        }
    },
    /**
     * Добавление элемента в хранилище
     */
    delete: (name) => {
      localStorage.removeItem("matalex_" + name);
    }
  };
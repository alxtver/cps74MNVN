class StringHelper {
  /**
   * Добавить к системному блоку или ПЭВМ единицу
   * @param serialNumber
   */
  public plusOne(serialNumber: string): string {
    const slicedString = this.sliceString(serialNumber);
    const secondPartPlusOne = parseInt(slicedString.secondPart) + 1;
    return (
      slicedString.firstPart +
      secondPartPlusOne.toString().padStart(slicedString.lengthSecondPart, '0')
    );
  }

  private sliceString(serialNumber: string): {
    firstPart: string;
    secondPart: string;
    lengthSecondPart: number;
  } {
    let indexChar = 0;
    for (let index = 0; index < serialNumber.length; index++) {
      if (!/\d/.test(serialNumber[index])) indexChar = index;
    }
    const firstPart = serialNumber.slice(0, indexChar + 1);
    const secondPart = serialNumber.slice(indexChar + 1);
    const lengthSecondPart = secondPart.length;
    return { firstPart, secondPart, lengthSecondPart };
  }
}

const stringHelper = new StringHelper();
export default stringHelper;

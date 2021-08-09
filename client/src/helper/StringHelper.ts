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
            secondPartPlusOne
                .toString()
                .padStart(slicedString.lengthSecondPart, '0')
        );
    }

    /**
     * Отнять от системного блока или ПЭВМ единицу
     * @param serialNumber
     */
    public minusOne(serialNumber: string): string {
        const slicedString = this.sliceString(serialNumber);
        const secondPartMinusOne = parseInt(slicedString.secondPart) - 1;
        return (
            slicedString.firstPart +
            secondPartMinusOne
                .toString()
                .padStart(slicedString.lengthSecondPart, '0')
        );
    }

	/**
	 * Получить номер системного блока или ПЭВМ в формате NUMBER
	 * @param serialNumber
	 */
	public getNumber(serialNumber: string): number {
        return parseInt(this.sliceString(serialNumber).secondPart);
    }

    public checkSerialNumbers(
        firstSerialNumber: string,
        secondSerialNumber: string,
    ): boolean {
        const firstSnSecondPart =
            this.sliceString(firstSerialNumber).secondPart;
        const firstSnSecondLen =
            this.sliceString(firstSerialNumber).lengthSecondPart;
        const lastSnSecondPart =
            this.sliceString(secondSerialNumber).secondPart;
        const lastSnSecondLen =
            this.sliceString(secondSerialNumber).lengthSecondPart;
        if (firstSnSecondLen !== lastSnSecondLen) {
            return false;
        }
        if (parseInt(firstSnSecondPart) > parseInt(lastSnSecondPart)) {
            return false;
        }
        return true;
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

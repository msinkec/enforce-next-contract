import { use } from 'chai'
import { sha256, toByteString } from 'scrypt-ts'
import { Contract1 } from '../src/contracts/contract1'
import { Contract2 } from '../src/contracts/contract2'
import { getDefaultSigner } from './utils/txHelper'
import chaiAsPromised from 'chai-as-promised'
use(chaiAsPromised)

describe('Test SmartContract `EnforceNextContract`', () => {
    before(async () => {
        await Contract1.compile()
        await Contract2.compile()
    })

    it('should pass the public method unit test successfully.', async () => {
        const instance1 = new Contract2(
            sha256(toByteString('hello world', true))
        )
        const nextLS = instance1.lockingScript.toHex()

        const instance0 = new Contract1(
            sha256(toByteString('hello world', true)),
            nextLS
        )
        await instance0.connect(getDefaultSigner())

        await instance0.deploy(1)

        // ...
    })
})

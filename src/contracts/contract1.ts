import {
    assert,
    ByteString,
    hash256,
    method,
    prop,
    sha256,
    Sha256,
    SmartContract,
    Utils,
} from 'scrypt-ts'

export class Contract1 extends SmartContract {
    @prop()
    hash: Sha256

    @prop()
    nextLS: ByteString

    constructor(hash: Sha256, nextLS: ByteString) {
        super(...arguments)
        this.hash = hash
        this.nextLS = nextLS
    }

    @method()
    public unlock(message: ByteString) {
        assert(sha256(message) == this.hash, 'Hash does not match')

        let outputs = Utils.buildOutput(this.nextLS, this.ctx.utxo.value)
        outputs += this.buildChangeOutput()
        assert(hash256(outputs) == this.ctx.hashOutputs)
    }
}

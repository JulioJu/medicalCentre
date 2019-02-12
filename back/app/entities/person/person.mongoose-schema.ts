import { REGEXFRENCH, messageREGEXFRENCH } from '../../utils/validator';
import { AbstractSchemaObject } from '../abstract';

export const PersonSchemaObject = {
    ...AbstractSchemaObject,
    _firstname: {type: String,
        required: true,
        validate: {
            isAsync: false,
            validator: (v: string): boolean => REGEXFRENCH.test(v),
            message: '{VALUE} should contain only: ' +
                messageREGEXFRENCH
        }
    },
    _lastname: {type: String,
        required: true,
        validate: {
            isAsync: false,
            validator: (v: string): boolean => REGEXFRENCH.test(v),
            message: '{VALUE} should contain only: ' +
                messageREGEXFRENCH
        }
    }
};

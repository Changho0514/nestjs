import { IsDefined, IsNotEmpty, IsOptional, Validate, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint(
    {async: true,}
)
class PasswordValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments | undefined): boolean | Promise<boolean> {
        // 비밀번호의 길이는 4자 이상 8자 이하
        return value.length > 4 && value.length < 8;
    }

    defaultMessage?(validationArguments?: ValidationArguments | undefined): string {
        return '비밀번호의 길이는 4자 이상 8자 이하이어야 합니다. 입력한 비밀번호는 ($value) 입니다.'; ;
    }
    
}
function IsPasswordValid(validationOptions?: ValidationOptions){
    return function(object: Object, propertyName: string){
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: PasswordValidator
        });
    }
}

export class UpdateMovieDto {

    @IsOptional()
    title?: string;


    @IsOptional()
    genre?: string;

    // @IsPasswordValid()
    // test: string;
}

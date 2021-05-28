import Context from "../context";
import AttributesMutaionHandler from "./AttributesMutaionHandler";
import CharacterDataMutationHandler from "./CharacterDataMutationHandler";
import ChildlistMutaionHandler from "./ChildlistMutaionHandler";
import MutationHandler from "./MutationHandler";

export default class MutationHandlerFactory {

    private static childlistHandler: ChildlistMutaionHandler;
    private static attributesHandler: AttributesMutaionHandler;
    private static characterDataHandler: CharacterDataMutationHandler;

    static create(type: MutationRecordType, context: Context): MutationHandler {
        switch (type) {
            case "childList":
                return this.childlistHandler || (this.childlistHandler = new ChildlistMutaionHandler(context)); 
            case "attributes":
                return this.attributesHandler || (this.attributesHandler = new AttributesMutaionHandler(context));
            case "characterData":
                return this.characterDataHandler || (this.characterDataHandler = new CharacterDataMutationHandler(context)); 
        }
    }
}
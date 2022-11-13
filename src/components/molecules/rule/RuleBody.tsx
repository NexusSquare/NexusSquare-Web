import { VStack, Text, Heading, UnorderedList, ListItem, Link } from '@chakra-ui/react'
import { Item } from 'framer-motion/types/components/Reorder/Item'
import React from 'react'
import { RuleLayout } from './RuleLayout'

// TODO: 処理を共通化
export const RuleBody = (): JSX.Element => {
    const titleList = [
        '第1条(適用)',
        '第2条(利用登録)',
        '第3条(ユーザーID及びパスワードの管理)',
        '第4条(禁止事項)',
        '第5条(本サービスの提供の停止等)',
        '第6条(利用制限および登録抹消)',
        '第7条(退会)',
        '第8条(保証の否認および免責事項)',
        '第9条(サービス内容の変更等)',
        '第10条(利用規約の変更)',
        '第11条(個人情報の取扱い)',
        '第12条(通知または連絡)',
        '第13条(権利義務の譲渡の禁止)',
        '第14条(準拠法)',
    ]

    const rule1Items = [
        '本規約は，ユーザーと当団体との間の本サービスの利用に関わる一切の関係に適用されるものとします。',
        '当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。',
        '本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。',
    ]

    const bodyList: JSX.Element[] = [
        <>
            <VStack spacing={2} align="left" w="full">
                <UnorderedList pl="5" spacing={3}>
                    {rule1Items.map((item: string, index: number) => {
                        return (
                            <ListItem fontSize="lg" key={index}>
                                {item}
                            </ListItem>
                        )
                    })}
                </UnorderedList>
            </VStack>
        </>,
        <>
            <Text fontSize="lg">
                本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当団体がこれを承認することによって，利用登録が完了するものとします。
            </Text>
            <Text fontSize="lg">
                当団体は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
            </Text>

            <UnorderedList pl="5" spacing={3}>
                <ListItem fontSize="lg">利用登録の申請に際して虚偽の事項を届け出た場合</ListItem>
                <ListItem fontSize="lg">本規約に違反したことがある者からの申請である場合</ListItem>
                <ListItem fontSize="lg">その他，当団体が利用登録を相当でないと判断した場合</ListItem>
            </UnorderedList>
        </>,
        <>
            <UnorderedList pl="5" spacing={3}>
                <ListItem fontSize="lg">
                    ユーザーは，自己の責任において,本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                </ListItem>
                <ListItem fontSize="lg">
                    ユーザーは,いかなる場合にも,ユーザーIDおよびパスワードを第三者に譲渡または貸与し,もしくは第三者と共用することはできません。当団体は,ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には,そのユーザーIDを登録しているユーザー自身による利用とみなします。
                </ListItem>
                <ListItem fontSize="lg">
                    ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は,当団体に故意又は重大な過失がある場合を除き，当社は一切の責任を負わないものとします。
                </ListItem>
            </UnorderedList>
        </>,
        <>
            <VStack spacing={2} align="left" w="full">
                <UnorderedList pl="5" spacing={3}>
                    <ListItem fontSize="lg">法令または公序良俗に違反する行為</ListItem>
                    <ListItem fontSize="lg"> 犯罪行為に関連する行為</ListItem>
                    <ListItem fontSize="lg">
                        {' '}
                        本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為
                    </ListItem>
                    <ListItem fontSize="lg">
                        当団体，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
                    </ListItem>
                    <ListItem fontSize="lg">本サービスによって得られた情報を商業的に利用する行為</ListItem>
                    <ListItem fontSize="lg">当社のサービスの運営を妨害するおそれのある行為</ListItem>
                    <ListItem fontSize="lg">不正アクセスをし，またはこれを試みる行為</ListItem>
                    <ListItem fontSize="lg">他のユーザーに関する個人情報等を収集または蓄積する行為</ListItem>
                    <ListItem fontSize="lg">不正な目的を持って本サービスを利用する行為</ListItem>
                    <ListItem fontSize="lg">
                        本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為
                    </ListItem>
                    <ListItem fontSize="lg">他のユーザーに成りすます行為</ListItem>
                    <ListItem fontSize="lg">当社が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為</ListItem>
                    <ListItem fontSize="lg">面識のない異性との出会いを目的とした行為</ListItem>
                    <ListItem fontSize="lg">
                        当社のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
                    </ListItem>
                    <ListItem fontSize="lg">
                        {' '}
                        他人を不快にさせるもの、誰かを著しく傷つけたり、攻撃したりするような投稿
                    </ListItem>
                    <ListItem fontSize="lg">学生生活に直接関わりのない、深刻な内容の投稿</ListItem>
                    <ListItem fontSize="lg">その他，当団体が不適切と判断する行為</ListItem>
                </UnorderedList>
            </VStack>
        </>,
        <>
            <Text fontSize="lg">
                当団体は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </Text>
            <UnorderedList pl="5" spacing={3}>
                <ListItem fontSize="lg">本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</ListItem>
                <ListItem fontSize="lg">
                    地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合
                </ListItem>

                <ListItem fontSize="lg">コンピュータまたは通信回線等が事故により停止した場合</ListItem>

                <ListItem fontSize="lg">その他，当社が本サービスの提供が困難と判断した場合</ListItem>

                <ListItem fontSize="lg">
                    当団体は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
                </ListItem>
            </UnorderedList>
        </>,
        <>
            <Text fontSize="xl">本ポリシーに関するお問い合わせは，以下のメールアドレスにお願いいたします。</Text>
        </>,
        <>
            <Text fontSize="lg">ユーザーは，当団体の定める退会手続により，本サービスから退会できるものとします。</Text>
        </>,
        <>
            <Text fontSize="lg"></Text>

            <UnorderedList pl="5" spacing={3}>
                <ListItem fontSize="lg">
                    当団体は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません
                </ListItem>
                <br />
                <ListItem fontSize="lg">
                    当社は，本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意又は重過失による場合を除き、一切の責任を負いません。ただし，本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
                </ListItem>
            </UnorderedList>
            <Text fontSize="lg">
                前項ただし書に定める場合であっても，当団体は，当団体の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。
            </Text>

            <Text fontSize="lg">
                当団体は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
            </Text>
        </>,
        <>
            <Text fontSize="lg">
                当団体は，ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
            </Text>
        </>,
        <>
            <Text fontSize="lg">
                当団体は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
            </Text>
            <UnorderedList pl="5" spacing={3}>
                <ListItem fontSize="lg"> 本規約の変更がユーザーの一般の利益に適合するとき。</ListItem>
                <ListItem fontSize="lg">
                    本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                </ListItem>
                <ListItem fontSize="lg">
                    当団体はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
                </ListItem>
            </UnorderedList>
        </>,
        <>
            <Text fontSize="lg">
                当団体は，本サービスの利用によって取得する個人情報については，当団体「プライバシーポリシー」に従い適切に取り扱うものとします。
            </Text>
        </>,
        <>
            <Text fontSize="lg">
                ユーザーと当団体との間の通知または連絡は，当団体の定める方法によって行うものとします。当団体は,ユーザーから,当団体が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
            </Text>
        </>,
        <>
            <Text fontSize="lg">
                ユーザーは，当団体の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
            </Text>
        </>,
        <>
            <Text fontSize="lg">本規約の解釈にあたっては，日本法を準拠法とします。</Text>
        </>,
    ]
    return (
        <VStack spacing={8}>
            {titleList.map((title: string, index: number) => {
                return (
                    <RuleLayout title={title} key={index}>
                        {bodyList[index]}
                    </RuleLayout>
                )
            })}
        </VStack>
    )
}
